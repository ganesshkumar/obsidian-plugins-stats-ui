import { Modal, Table, Tooltip } from 'flowbite-react';
import moment from 'moment';
import { useState } from 'react';
import { Info } from 'react-feather';

export const Score = (props) => {
  const { plugin } = props;
  const [openScoreModal, setOpenScoreModal] = useState(false);

  let scoreClass = '';
  if (plugin.score > 0.8) {
    scoreClass = 'text-green-500';
  } else if (plugin.score > 0.6) {
    scoreClass = 'text-yellow-500';
  } else if (plugin.score > 0.3) {
    scoreClass = 'text-orange-500';
  } else {
    scoreClass = 'text-red-500';
  }

  const reasonMap = {};
  plugin.scoreReason.split('\n').forEach((reason) => {
    const reasonParts = reason.split(':');
    reasonMap[reasonParts[0]] = {};
    reasonMap[reasonParts[0]].value = reasonParts[1];
    reasonMap[reasonParts[0]].normalized = reasonParts[2];
    reasonMap[reasonParts[0]].weight = reasonParts[3];
    reasonMap[reasonParts[0]].score = reasonParts[4];
  });

  return (
    <div className="flex items-baseline mt-2">
      <span className="text-xl">Score: </span>
      <span className={`text-4xl font-sans font-bold ${scoreClass}`}>
        {Math.round(plugin.score.toFixed(2) * 100)}
      </span>
      /100
      <span className="ml-2">
        <Tooltip content="Explain score" className="inline-block">
          <Info
            className="inline-block text-gray-600 cursor-pointer"
            size={20}
            onClick={(_) => setOpenScoreModal(!openScoreModal)}
          />
        </Tooltip>
      </span>
      <Modal
        dismissible
        show={openScoreModal}
        onClose={() => setOpenScoreModal(false)}
      >
        <Modal.Header>
          Score explanation for <span className="font-bold">{plugin.name}</span>
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
                  {parseFloat(reasonMap['stargazers'].value).toLocaleString()}
                </Table.Cell>
                <Table.Cell>{reasonMap['stargazers'].weight * 100}%</Table.Cell>
                <Table.Cell className="text-right">
                  {(parseFloat(reasonMap['stargazers'].score) * 100).toFixed(2)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Forks</Table.Cell>
                <Table.Cell>
                  {parseFloat(reasonMap['forks'].value).toLocaleString()}
                </Table.Cell>
                <Table.Cell>{reasonMap['forks'].weight * 100}%</Table.Cell>
                <Table.Cell className="text-right">
                  {(parseFloat(reasonMap['forks'].score) * 100).toFixed(2)}
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
                  {parseFloat(reasonMap['closedIssuesRatio'].value).toFixed(2)}
                </Table.Cell>
                <Table.Cell>
                  {reasonMap['closedIssuesRatio'].weight * 100}%
                </Table.Cell>
                <Table.Cell className="text-right">
                  {(
                    parseFloat(reasonMap['closedIssuesRatio'].score) * 100
                  ).toFixed(2)}
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
                  {parseFloat(reasonMap['resolvedPRRatio'].value).toFixed(2)}
                </Table.Cell>
                <Table.Cell>
                  {reasonMap['resolvedPRRatio'].weight * 100}%
                </Table.Cell>
                <Table.Cell className="text-right">
                  {(
                    parseFloat(reasonMap['resolvedPRRatio'].score) * 100
                  ).toFixed(2)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Commits Last Year</Table.Cell>
                <Table.Cell>
                  {parseFloat(reasonMap['commitCountInLastYear'].value).toFixed(
                    2
                  )}
                </Table.Cell>
                <Table.Cell>
                  {reasonMap['commitCountInLastYear'].weight * 100}%
                </Table.Cell>
                <Table.Cell className="text-right">
                  {(
                    parseFloat(reasonMap['commitCountInLastYear'].score) * 100
                  ).toFixed(2)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total Downloads</Table.Cell>
                <Table.Cell>
                  {parseFloat(
                    reasonMap['totalDownloads'].value
                  ).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {reasonMap['totalDownloads'].weight * 100}%
                </Table.Cell>
                <Table.Cell className="text-right">
                  {(
                    parseFloat(reasonMap['totalDownloads'].score) * 100
                  ).toFixed(2)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Latest Release at</Table.Cell>
                <Table.Cell>
                  {moment(plugin.latestReleaseAt).fromNow()}
                </Table.Cell>
                <Table.Cell>
                  {reasonMap['latestReleaseAt'].weight * 100}%
                </Table.Cell>
                <Table.Cell className="text-right">
                  {(
                    parseFloat(reasonMap['latestReleaseAt'].score) * 100
                  ).toFixed(2)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>{moment(plugin.createdAt).fromNow()}</Table.Cell>
                <Table.Cell>{reasonMap['createdAt'].weight * 100}%</Table.Cell>
                <Table.Cell className="text-right">
                  {(parseFloat(reasonMap['createdAt'].score) * 100).toFixed(2)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
                <Table.Cell className="text-right font-bold" colSpan={3}>
                  {plugin.score.toFixed(4) * 100}
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
            className="underline"
          >
            Github discussion
          </a>
          .
        </Modal.Footer>
      </Modal>
    </div>
  );
};
