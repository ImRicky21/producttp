export default function WaveUpperRight(props: any) {
  const { className } = props;
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          className={className}
          fill="#0099ff"
          fill-opacity="1"
          d="M0,32L40,42.7C80,53,160,75,240,80C320,85,400,75,480,69.3C560,64,640,64,720,101.3C800,139,880,213,960,245.3C1040,277,1120,267,1200,266.7C1280,267,1360,277,1400,282.7L1440,288L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}
