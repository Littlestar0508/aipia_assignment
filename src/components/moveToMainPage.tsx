import { useNavigate } from 'react-router';

function MoveToMainPage() {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="w-12 fixed bottom-8 right-8 bg-blue-300 rounded-full p-2 z-999"
      >
        <img src="/home.png" alt="메인 페이지로 이동" />
      </button>
    </>
  );
}

export default MoveToMainPage;
