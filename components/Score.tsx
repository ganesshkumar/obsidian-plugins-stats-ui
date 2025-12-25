import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Modal, Table, Tooltip } from 'flowbite-react';
import moment from 'moment';
import { Info } from 'react-feather';
import { getScoreTextClass } from '../lib/customThemes';
import {
  GET_PLUGIN_SCORE_DETAILS_QUERY,
  type IPluginScoreDetails,
  type IPluginScoreDetailsResult,
} from '@/lib/graphql/queries';

export const Score = (props) => {
  const { plugin, redirectForReason } = props;
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [details, setDetails] = useState<IPluginScoreDetails | null>(null);

  const [loadDetails, { data, loading: isLoading, error }] =
    useLazyQuery<IPluginScoreDetailsResult>(GET_PLUGIN_SCORE_DETAILS_QUERY, {
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
    });

  useEffect(() => {
    if (data?.pluginScoreDetails) {
      setDetails(data.pluginScoreDetails);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('Failed to load score details', error);
    }
  }, [error]);

  const scoreValue = plugin.score ?? details?.score ?? 0;
  const scoreClass = getScoreTextClass(scoreValue);

  const scoreReasonSource = details?.scoreReason ?? plugin.scoreReason;

  if (
    !plugin.score &&
    !details?.score &&
    !redirectForReason &&
    !scoreReasonSource
  ) {
    return undefined;
  }

  const reasonMap: Record<string, Record<string, string>> = {};

  if (!redirectForReason && scoreReasonSource) {
    scoreReasonSource.split('\n').forEach((reason) => {
      const reasonParts = reason.split(':');
      reasonMap[reasonParts[0]] = {};
      reasonMap[reasonParts[0]].value = reasonParts[1];
      reasonMap[reasonParts[0]].normalized = reasonParts[2];
      reasonMap[reasonParts[0]].weight = reasonParts[3];
      reasonMap[reasonParts[0]].score = reasonParts[4];
    });
  }

  const onClickHandler = async () => {
    if (redirectForReason) {
      window.open(`/plugins/${plugin.pluginId}?showScoreReason=true`, '_blank');
      return;
    }

    if (!details && !isLoading) {
      loadDetails({ variables: { pluginId: plugin.pluginId } });
    }

    setOpenScoreModal(!openScoreModal);
  };

  return (
    <div className="flex items-baseline mt-2">
      <span className="text-xl text-gray-600">Score: </span>
      <span className={`text-2xl font-sans font-bold ${scoreClass}`}>
        {Math.round(Number((scoreValue ?? 0).toFixed(2)) * 100)}
      </span>
      <span className="text-gray-600">/100</span>
      <span className="ml-2">
        <Tooltip content="Explain score" className="inline-block">
          <Info
            data-testid="score-info"
            className="inline-block text-gray-600 cursor-pointer pb-1"
            size={20}
            onClick={onClickHandler}
          />
        </Tooltip>
      </span>
      {!redirectForReason && (
        <Modal
          dismissible
          show={openScoreModal}
          onClose={() => setOpenScoreModal(false)}
        >
          <Modal.Header>
            Score explanation for{' '}
            <span className="font-bold">{plugin.name}</span>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <Table.Head>
                <Table.HeadCell>Metric</Table.HeadCell>
                <Table.HeadCell>Value</Table.HeadCell>
                <Table.HeadCell>Weight</Table.HeadCell>
                <Table.HeadCell>Contribution</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row>
                  <Table.Cell>Stars</Table.Cell>
                  <Table.Cell>
                    {parseFloat(
                      String(
                        reasonMap['stargazers']?.value ??
                          details?.stargazers ??
                          0
                      )
                    ).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['stargazers']?.weight
                      ? Number(reasonMap['stargazers'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['stargazers']?.score
                      ? (
                          parseFloat(reasonMap['stargazers'].score) * 100
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Forks</Table.Cell>
                  <Table.Cell>
                    {parseFloat(
                      String(reasonMap['forks']?.value ?? details?.forks ?? 0)
                    ).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['forks']?.weight
                      ? Number(reasonMap['forks'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['forks']?.score
                      ? (parseFloat(reasonMap['forks'].score) * 100).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="flex gap-x-1">
                    Closed Issues Ratio
                    <Tooltip
                      content={`Closed Issues = ${plugin.closedIssues}, Open Issues = ${plugin.openIssues}, Total Issues = ${plugin.totalIssues}`}
                    >
                      <Info
                        className="inline-block text-gray-600 cursor-pointer"
                        size={12}
                      />
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['closedIssuesRatio']?.value
                      ? parseFloat(
                          reasonMap['closedIssuesRatio'].value
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['closedIssuesRatio']?.weight
                      ? Number(reasonMap['closedIssuesRatio'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['closedIssuesRatio']?.score
                      ? (
                          parseFloat(reasonMap['closedIssuesRatio'].score) * 100
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="flex gap-x-1">
                    Resolved PR Ratio
                    <Tooltip
                      content={`Merged PR = ${plugin.mergedPR}, Closed PR = ${plugin.closedPR}, Open PR = ${plugin.openPR}, Total PR = ${plugin.totalPR}`}
                    >
                      <Info
                        className="inline-block text-gray-600 cursor-pointer"
                        size={12}
                      />
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['resolvedPRRatio']?.value
                      ? parseFloat(reasonMap['resolvedPRRatio'].value).toFixed(
                          2
                        )
                      : '-'}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['resolvedPRRatio']?.weight
                      ? Number(reasonMap['resolvedPRRatio'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['resolvedPRRatio']?.score
                      ? (
                          parseFloat(reasonMap['resolvedPRRatio'].score) * 100
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Commits Last Year</Table.Cell>
                  <Table.Cell>
                    {reasonMap['commitCountInLastYear']?.value
                      ? parseFloat(
                          reasonMap['commitCountInLastYear'].value
                        ).toFixed(2)
                      : (details?.commitCountInLastYear ?? '-')}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['commitCountInLastYear']?.weight
                      ? Number(reasonMap['commitCountInLastYear'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['commitCountInLastYear']?.score
                      ? (
                          parseFloat(reasonMap['commitCountInLastYear'].score) *
                          100
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total Downloads</Table.Cell>
                  <Table.Cell>
                    {parseFloat(
                      String(
                        reasonMap['totalDownloads']?.value ??
                          details?.totalDownloads ??
                          0
                      )
                    ).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['totalDownloads']?.weight
                      ? Number(reasonMap['totalDownloads'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['totalDownloads']?.score
                      ? (
                          parseFloat(reasonMap['totalDownloads'].score) * 100
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Latest Release at</Table.Cell>
                  <Table.Cell>
                    {moment(
                      details?.latestReleaseAt ?? plugin.latestReleaseAt
                    ).fromNow()}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['latestReleaseAt']?.weight
                      ? Number(reasonMap['latestReleaseAt'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['latestReleaseAt']?.score
                      ? (
                          parseFloat(reasonMap['latestReleaseAt'].score) * 100
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Created</Table.Cell>
                  <Table.Cell>
                    {moment(details?.createdAt ?? plugin.createdAt).fromNow()}
                  </Table.Cell>
                  <Table.Cell>
                    {reasonMap['createdAt']?.weight
                      ? Number(reasonMap['createdAt'].weight) * 100
                      : '-'}
                    %
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    {reasonMap['createdAt']?.score
                      ? (
                          parseFloat(reasonMap['createdAt'].score) * 100
                        ).toFixed(2)
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Score</Table.Cell>
                  <Table.Cell className="text-right font-bold" colSpan={3}>
                    {Number((scoreValue ?? 0).toFixed(4)) * 100}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <span>For more details on score calculation visit this</span>
            <a
              href="https://github.com/ganesshkumar/obsidian-plugins-stats-ui/discussions/52"
              target="_blank"
              className="underline" rel="noreferrer"
            >
              Github discussion
            </a>
            .
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
