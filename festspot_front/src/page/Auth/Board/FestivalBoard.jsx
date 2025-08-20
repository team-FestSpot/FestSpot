/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { use, useEffect, useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import {
  MdChevronLeft,
  MdChevronRight,
  MdMessage,
  MdOutlineFestival,
  MdOutlineRateReview,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../../../constants/BoardContext";
import { useBoardPosts } from "../../../querys/post/useBoardPosts";

function FestivalBoard() {
  const navigate = useNavigate();
  const { currentBoard, onBoardChange, loading: parentLoading } = useBoard();
  const [localCurrentBoard, setLocalCurrentBoard] = useState(currentBoard);
  const [boardData, setBoardData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const boardPosts = useBoardPosts({
    boardKey: localCurrentBoard,
    page: currentPage,
  });

  const posts = boardPosts.data?.data?.posts || [];
  const totalCount = boardData.data?.data?.totalPages || 0;
  const totalPages = boardData.data?.data?.totalPages || 1;

  console.log(posts);

  useEffect(() => {
    setLocalCurrentBoard(currentBoard);
    setCurrentPage(1);
  }, [currentBoard]);

  const boards = [
    {
      id: "free",
      name: "자유 게시판",
      icon: MdMessage,
      categoryId: 1,
    },
    {
      id: "review",
      name: "후기 게시판",
      icon: MdOutlineRateReview,
      categoryId: 2,
    },
    {
      id: "transfer",
      name: "양도 게시판",
      icon: IoTicketOutline,
      categoryId: 3,
    },
    {
      id: "small",
      name: "소규모 축제 게시판",
      icon: MdOutlineFestival,
      categoryId: 4,
    },
  ];

  // 현재 게시판의 데이터 가져오기
  const currentBoardData = boardData[localCurrentBoard] || {
    posts: [],
    totalCount: 0,
    totalPages: 1,
  };

  const hanldeBoardOnChange = (boardId) => {
    setLocalCurrentBoard(boardId);
    setCurrentPage(1);
    onBoardChange?.(boardId);
  };

  const handlePageOnClick = (page) => setCurrentPage(page);

  const handleWriteButtonOnClick = () => {
    navigate(`/board/write`);
  }

  return (
    // <>
    //   {posts.map((post) => (
    //     <div>{post.postTitle}</div>
    //   ))}
    // </>
    <div css={s.mainContainer}>
      <div css={s.boardHeader}>
        <h2 css={s.boardInfo}>
          {boards.find((b) => b.id === localCurrentBoard)?.name}
        </h2>
        <span css={s.boardMeta}>
          총 {currentBoardData.totalCount} 개의 글 | {currentPage} /{" "}
          {totalPages} 페이지
        </span>
        <div css={s.headerButtons}>
          <button css={s.writeBtn} disabled={false} onClick={handleWriteButtonOnClick} >
            <AiOutlinePlus css={s.icon} />
            글쓰기
          </button>
        </div>
      </div>

      {boardPosts.isLoading && (
        <div css={s.loadingContainer}>
          <div css={s.loadingSpinner}>로딩 중...</div>
        </div>
      )}

      {boardPosts.isError && (
        <div css={s.errorContainer}>
          <p css={s.errorMessage}>데이터를 불러오는데 실패했습니다.</p>
        </div>
      )}

      {boardPosts.isFetched && (
        <div css={s.cardsGrid}>
          {posts.map((post) => (
            <div
              key={post.postId}
              css={s.card}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/board/post/${post.postId ?? post.id}`)}        // ← 여기 추가
              onKeyDown={(e) => e.key === "Enter" && navigate(`/board/post/${post.postId}`)} // 키보드 접근성
            >
              <div css={s.cardImageContainer}>
                <img
                  src={post.thumbnailImageUrl || post.postImgUrl}
                  alt={post.postTitle}
                  css={s.cardImage}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=300&h=200&fit=crop";
                  }}
                />
                <div css={s.cardImageOverlay}></div>
              </div>
              <div css={s.cardContent}>
                <h3 css={s.cardTitle}>{post.postTitle}</h3>
                <div css={s.cardMeta}>
                  <span css={s.cardAuthor}>{post.authorName || post.username}</span>
                  <span css={s.cardDate}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FestivalBoard;
