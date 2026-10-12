import React from 'react';

export default function MarkdownContent({ content }) {
  const blocks = content
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, index) => {
        const heading = block.match(/^(#{2,3})\s+(.+)$/);
        if (heading?.[1] === '##') {
          return (
            <h2 key={index} className="font-display text-3xl text-text-primary mt-10 mb-4">
              {heading[2]}
            </h2>
          );
        }
        if (heading?.[1] === '###') {
          return (
            <h3 key={index} className="font-display text-2xl text-text-primary mt-8 mb-3">
              {heading[2]}
            </h3>
          );
        }
        return (
          <p key={index} className="mb-5">
            {block.replace(/\r?\n/g, ' ')}
          </p>
        );
      })}
    </>
  );
}
