import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import TextField from '@mui/material/TextField';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

function AdminTicketingInputList({ticketingUrlList, setTicketingUrlList, ticketingInputValue, setTicketingInputValue}) {
const handleTicketingPlusOnClick = () => {
    setTicketingUrlList([
      ...ticketingUrlList,
      {
        id1: "relatenm",
        type1: "text",
        placeholder1: "예매처명",

        id2: "relateurl",
        type2: "text",
        placeholder2: "예매처 URL",
      },
    ]);

    setTicketingInputValue([
      ...ticketingInputValue,
      {
        relatenm: "",
        relateurl: "",
      },
    ]);
  };

  // 예매처 - 버튼 눌렀을 때 해당 열을 지우고 싶은데 어디에 있는 버튼을 눌러도 맨 마지막 열이 지워짐
  // 그래서 그냥 버튼이 마지막 열에만 생기도록 수정함
  const handleTicketingMinusOnClick = (e, deleteIndex) => {
    setTicketingUrlList(
      ticketingUrlList.filter((url, index) => index !== deleteIndex)
    );
    setTicketingInputValue(
      ticketingInputValue.filter((inputValue, index) => index !== deleteIndex)
    );
  };

  const handleTicketingInputOnChange = (e, index) => {
    const { id, value } = e.target;
    setTicketingInputValue((prev) => {
      const inputValue = [...prev];
      inputValue[index] = { ...inputValue[index], [id]: value };
      return inputValue;
    });
  };

    return (
        <>
            {ticketingUrlList.map((ticketingUrl, index) => (
                <div css={s.inputTicketingContainer} key={index}>
                  <div css={s.oneSideInputContainer}>
                    <div>
                        <p>{ticketingUrl.placeholder1}</p>
                    </div>
                    <div css={s.inputTicketingAgencyNameContainer}>
                        <TextField
                        id={ticketingUrl.id1}
                        type={ticketingUrl.type1}
                        placeholder={ticketingUrl.placeholder1}
                        value={ticketingInputValue.relatenm}
                        onChange={(e) => handleTicketingInputOnChange(e, index)}
                        size="small"
                        sx={{ width: "100%" }}
                        />
                    </div>
                  </div>
                  <div css={s.oneSideInputContainer}>
                    <div>
                        <p>{ticketingUrl.placeholder2}</p>
                    </div>
                    <div css={s.inputTicketingUrlContainer}>
                        <TextField
                        id={ticketingUrl.id2}
                        type={ticketingUrl.type2}
                        placeholder={ticketingUrl.placeholder2}
                        value={ticketingInputValue.relateurl}
                        onChange={(e) => handleTicketingInputOnChange(e, index)}
                        size="small"
                        sx={{ width: "100%" }}
                        />
                    </div>
                  </div>
                    <div css={s.urlAddRemoveButtonsContainer}>
                        {index === ticketingUrlList.length - 1 && (
                        <CiSquarePlus onClick={handleTicketingPlusOnClick} />
                        )}

                        {index > 0 && index === ticketingUrlList.length - 1 && (
                        <CiSquareMinus
                            onClick={(e) => handleTicketingMinusOnClick(e, index)}
                        />
                        )}
                    </div>
                </div>
          ))}
        </>
    );
}

export default AdminTicketingInputList;