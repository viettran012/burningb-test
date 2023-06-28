import Skeleton from "@mui/material/Skeleton";

const Variants: React.FC = () => {
  const arr = Array(Math.floor(4)).fill(0);
  return (
    <div className="flex-wrap flex justify-between w-full relative">
      {arr.map((i, index): any => (
        <div key={index} className="relative h-96 w-49/100 mb-2">
          <Skeleton
            key={index}
            variant="rounded"
            width={"100%"}
            height={"100%"}
            animation="wave"
          />
          <Skeleton
            style={{
              position: "absolute",
              bottom: "72px",
              left: "12px",
              right: "12px",
            }}
            animation="wave"
            height={"24px"}
          />
          <Skeleton
            style={{
              position: "absolute",
              bottom: "20px",
              left: "12px",
              right: "12px",
            }}
            animation="wave"
            height={"54px"}
          />
        </div>
      ))}
    </div>
  );
};
export default Variants;
