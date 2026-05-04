import formatDate from '@/utils/timeFormatter';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type NewsCardProps = {
  title: string;
  by: string;
  time: number;
  id: number;
};

// 부모에게 제목, 작성자, 시간, id 받아오기
function NewsCard({ title, by, time, id }: NewsCardProps) {
  const navigate = useNavigate();

  // id에 따라 picsum에서 불러올 이미지 선택
  const getPhotoId = (id: number) => {
    const idStr = String(id);

    // id의 1,4,마지막 자리 숫자를 이용해 picsum id 설정
    return `${idStr.charAt(0)}${idStr.charAt(3)}${idStr.charAt(
      idStr.length - 1,
    )}`;
  };

  // img가 있는지 없는지 체크하기 위한 상태
  const [imgSrc, setImgSrc] = useState(
    `https://picsum.photos/id/${getPhotoId(id)}/100/100`,
  );

  return (
    <div className="flex flex-row gap-4 items-center" key={id}>
      {/* 만약 이미지가 존재하지 않는다면 base.png사용 */}
      <img
        src={imgSrc}
        onError={() => setImgSrc('/base.png')}
        className="w-20 rounded-md border aspect-square"
      />
      {/* 제목을 클릭하면 세부 페이지로 이동 */}
      <div className="h-20 flex flex-col justify-between whitespace-nowrap overflow-hidden">
        <button type="button" onClick={() => navigate(`/news/${id}`)}>
          <h2 className="font-bold text-xl">{title}</h2>
        </button>
        <div>
          <p className="text-gray-500 text-base">{by}</p>
          {/* fomatDate 함수를 통해 시간 계산 */}
          <p className="text-gray-500 text-base">{formatDate(time)}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
