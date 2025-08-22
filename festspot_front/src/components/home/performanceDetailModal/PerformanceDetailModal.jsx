/** @jsxImportSource @emotion/react */
import ReactModal from "react-modal";
import * as s from "./styles";
import { Global } from "@emotion/react";
import { useNavigate } from "react-router-dom";

function PerformanceDetailModal({ isOpen, setOpen, performance }) {
  const { isFestival, isForeign } = performance;

  return (
    <>
      <Global styles={s.container} />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        appElement={document.getElementById("root")}
        shouldFocusAfterRender={false}
        className="modal"
        style={{
          overlay: {
            backgroundColor: "#00000088",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          },
        }}
      >
        <div css={s.PerformanceDetailModalLayout}>
          <div css={s.imgContainer}>
            <img
              css={s.posterImg}
              src={performance.performancePosterUrl}
              alt=""
            />
            <div css={s.responsiveDateBox}>
              {performance.performanceStartDate ===
              performance.performanceEndDate
                ? `${performance.performanceStartDate}`
                : `${performance.performanceStartDate} ~ ${performance.performanceEndDate}`}
            </div>
          </div>
          <div css={s.infoContainer}>
            <div css={s.categoryContainer} id="category">
              <div css={s.categoryBox(isFestival, isForeign)} />
              <div>
                {!!isFestival && "페스티벌"}
                {!!isForeign && "내한공연"}
                {!(!!isFestival || !!isForeign) && "일반공연"}
              </div>
            </div>
            <div css={s.dateContainer}>
              <div>
                {performance.performanceStartDate ===
                performance.performanceEndDate
                  ? `${performance.performanceStartDate}`
                  : `${performance.performanceStartDate} ~ ${performance.performanceEndDate}`}
              </div>
            </div>
            <div css={s.titleContainer}>
              <h3>{performance.performanceTitle}</h3>
            </div>
            <div css={s.venueContainer}>
              <div>장소</div>
              <div>{performance.performanceVenue}</div>
            </div>
            {!!performance.performanceCast && (
              <div css={s.castContainer}>
                <div>출연진</div>
                <div>{performance.performanceCast}</div>
              </div>
            )}
            <div css={s.urlContainer}>
              <div>예매 링크</div>
              <div>
                {!!performance.ticketingUrls &&
                  performance.ticketingUrls.map((ticketingUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        window.open(ticketingUrl.ticketingUrl, "_blank")
                      }
                    >
                      <a>{ticketingUrl.ticketingAgencyName}</a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default PerformanceDetailModal;
