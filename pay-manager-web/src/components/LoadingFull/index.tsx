import './index.less';

export default () => {
  return (
    <div className="loading-wrapper">
      <ul>
        {
          Array.from({ length: 5 }).map((_, idx) => <li key={idx}></li>)
        }
      </ul>
    </div>
  );
};

