import { PullRequestEntry } from '@prisma/client';
import { Card, CustomFlowbiteTheme } from 'flowbite-react';
import moment from 'moment';
import { GitBranch, GitHub } from 'react-feather';

interface IBetaEntryCardProps {
  entry: PullRequestEntry;
  highlight?: string;
}

const customPluginCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children:
      'flex h-full flex-col justify-start gap-2 py-2 px-5 hover:bg-violet-100',
  },
};

const customThemeCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children:
      'flex h-full flex-col justify-start gap-2 py-2 px-5 hover:bg-emerald-100',
  },
};

/**
 * Card to display a beta (prospective) plugin / theme coming from an open PR.
 * Responsive and kept visually similar to PluginCard but tailored for PR data.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatches(text: string | null, query?: string) {
  if (!text) return '';
  if (!query) return text;
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map((t) => escapeRegex(t));
  if (!tokens.length) return text;
  const regex = new RegExp(`(${tokens.join('|')})`, 'gi');
  return text.replace(regex, (m) => `<mark>${m}</mark>`);
}

export const BetaEntryCard = ({ entry, highlight }: IBetaEntryCardProps) => {
  const prUrl = `https://github.com/obsidianmd/obsidian-releases/pull/${entry.prNumber}`;
  const repoUrl = `https://github.com/${entry.repo}`;

  const typeColor =
    entry.type === 'theme'
      ? 'bg-emerald-600 text-emerald-100'
      : 'bg-violet-600 text-violet-100';
  return (
    <Card
      theme={
        entry.type === 'theme' ? customThemeCardTheme : customPluginCardTheme
      }
    >
      {/* <div className="relative flex flex-col justify-between group shrink-0 my-1 px-5 py-2 border rounded-md shadow-lg hover:shadow-gray-200/50 shadow-slate-200/50 hover:bg-gray-50 bg-white text-gray-700"> */}
      <div>
        <div className="flex items-start justify-between gap-x-2">
          <div>
            <div className="text-xl font-medium tracking-tighter text-gray-800">
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight
                    ? highlightMatches(entry.name || '(Unnamed)', highlight)
                    : entry.name || '(Unnamed)',
                }}
              />
            </div>
          </div>
          <span
            className={`px-2 py-0.5 uppercase rounded-full text-[10px] font-semibold ${typeColor}`}
          >
            {entry.type}
          </span>
        </div>
        <div className="text-xs">
          <span>{moment(entry.createdAt).fromNow()}</span>{' '}
          {entry.author && (
            <>
              by{' '}
              <span
                className="italic text-gray-600 group-hover:text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: highlight
                    ? highlightMatches(entry.author, highlight)
                    : entry.author,
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="grow mt-5 text-sm tracking-tight line-clamp-4 whitespace-pre-line text-gray-700">
        <span
          dangerouslySetInnerHTML={{
            __html: highlight
              ? highlightMatches(entry.description || '', highlight)
              : entry.description || '',
          }}
        />
      </div>
      {/* {entry.version && (
        <div className="mt-2 text-xs text-gray-500">Version: {entry.version}</div>
      )} */}
      {entry.needManualReview && (
        <div className="mt-3 text-xs text-amber-700 bg-amber-100 border border-amber-300 rounded px-2 py-1">
          Needs manual review
          {entry.manualReviewReason && `: ${entry.manualReviewReason}`}
        </div>
      )}
      <div className="mt-4 text-xs text-gray-500 font-medium flex items-center gap-x-2">
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1 rounded-xl bg-gray-700 hover:bg-gray-800 flex items-center gap-1 px-2 text-gray-100"
            aria-label="Open GitHub Pull Request"
          >
            <GitHub size={14} className="text-gray-100" />
            Repo
          </a>
        )}
        <a
          href={prUrl}
          target="_blank"
          rel="noreferrer"
          className="p-1 rounded-xl bg-white hover:bg-gray-200 flex items-center gap-1 px-2 text-gray-800"
          aria-label="Open the Pull Request"
        >
          <GitBranch size={14} />
          Pull Request
        </a>
      </div>
      {/* </div> */}
    </Card>
  );
};

export default BetaEntryCard;
