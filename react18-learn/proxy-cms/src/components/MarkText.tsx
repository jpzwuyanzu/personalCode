
interface IProps {
    text:any
    keyword:any
}

 const Mark = ({ text, keyword }: IProps) => {
    if (!keyword) {
      return <>{text}</>;
    }
    const arr = text.split(keyword);
    return (
      <>
        {arr.map((str:any, index:any) => (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "#00B96B" }}>{keyword}</span>
            )}
          </span>
        ))}
      </>
    );
  };
  export default Mark