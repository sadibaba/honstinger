import React from 'react';

export default function Head() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var s=localStorage.getItem('theme');var t=(s==='dark'||s==='light')?s:'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
        }}
      />
    </>
  );
}