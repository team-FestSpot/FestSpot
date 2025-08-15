import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AdminInput from '../AdminInput/AdminInput';
import Button from '@mui/material/Button';
import useAdminAddPerformanceStore from '../../../stores/AdminAddPerformanceStore';
import { reqUploadPerformanceApi } from '../../../api/adminApi';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

function AdminAddPerformance(props) {
    const [imageFile, setImageFile] = useState({});
    const {detail, setDetail, setDetailEmpty} = useAdminAddPerformanceStore();
    const [ticketingUrlList, setTicketingUrlList] = useState([
        [
            {
                id: "relatenm",
                type: "text",
                placeholder: "예매처명",
                options: [],
            },
            {
                id: "relateurl",
                type: "text",
                placeholder: "예매처 URL",
                options: [],
            }
        ],
    ]);
    const inputList = [
        {
            id: "prfnm",
            type: "text",
            placeholder: "공연/페스티벌명",
            options: [],
        },
        {
            id: "area",
            type: "select",
            placeholder: "공연 지역",
            options: [
                "서울특별시",
                "부산광역시",
                "대구광역시",
                "인천광역시",
                "광주광역시",
                "대전광역시",
                "울산광역시",
                "세종특별자치시",
                "경기도",
                "강원특별자치도",
                "충청북도",
                "전라북도",
                "전라남도",
                "경상북도",
                "경상남도",
                "제주특별자치도",
                "전북특별자치도",
             ],
        },
        {
            id: "fcltynm",
            type: "text",
            placeholder: "공연 장소",
            options: [],
        },
        {
            id: "prfstate",
            type: "select",
            placeholder: "공연 진행 상황",
            options: [
                "공연예정",
                "공연중",
                "공연완료",
            ],
        },
        {
            id: "prfpdfrom",
            type: "date",
            placeholder: "공연 시작일",
            options: [],
        },
        {
            id: "prfpdto",
            type: "date",
            placeholder: "공연 종료일",
            options: [],
        },
        {
            id: "prfcast",
            type: "text",
            placeholder: "출연진",
            options: [],
        },
        {
            id: "visit",
            type: "select",
            placeholder: "내한",
            options: ["Y", "N"],
        },
        {
            id: "festival",
            type: "select",
            placeholder: "페스티벌",
            options: ["Y", "N"],
        },
    ]
    

    const handleImageUploadOnChange = (e) => {
        setImageFile(...e.target.files);

        // const filesArray = [...e.target.files];

        // Promise.all(filesArray.map(file => {
        //     return new Promise(resolve => {
        //         const fileReader = new FileReader();
        //         fileReader.onload = (e) => {
        //             resolve({file, dataUrl: e.target.result});
        //         }
        //         fileReader.readAsDataURL(file);
        //     })
        // })).then(resolves => {
        //     setImages(prev => [...prev, ...resolves]);
        // });
    }

    const handleAddPerformanceButtonOnClick = () => {
        let formData = new FormData;
        formData.append("detail", detail);
        formData.append("file", imageFile);
        formData.append("ticketingUrlList", ticketingUrlList);

        try {
            reqUploadPerformanceApi(detail);
            setDetailEmpty();
            setImageFile("");
        } 
        catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     console.log(imageFile);
    // }, [imageFile]);

    //  useEffect(() => {
    //     console.log(details);
    // }, [details]);

     useEffect(() => {
        console.log(ticketingUrlList);
    }, []);

    return (
        <div css={s.layout}>
            <div css={s.imgContainerLayout}>
                <div css={s.imgContainer}>
                    <img src={imageFile.dataUrl} alt="" />
                </div>
            {/* {
                images.map((image, index) => 
                    <div key={index} css={s.imgContainer}>
                        <img src={image.dataUrl} alt="" />
                    </div>
                )
            } */}
            </div>
            <div css={s.inputListContainerLayout}>
                <div css={s.imgInput}>
                    <input type="file" accept='image/*' onChange={handleImageUploadOnChange} />
                </div>
                {
                    inputList.map((input, index) => 
                        <div key={index} css={s.inputListContainer}>
                            <AdminInput props={input} />
                        </div>
                    )
                }
                {
                    
                    ticketingUrlList.map((ticketingUrl) => (
                        ticketingUrl.map((input, index) => 
                        <div>
                            <div>
                                <p>{input.placeholder}</p>
                            </div>
                            <div key={index} css={s.inputListContainer}>
                                <div key={input.id} css={s.inputContainer}>
                                    <div css={s.inputTicketingContainer}>
                                        <input type={input.type} placeholder={input.placeholder}  onChange={(e) => handleInputOnChange(e, input.id)} />
                                    </div>
                                    {/* <div css={s.inputTicketingUrlContainer}>
                                        <input type={input.type} placeholder={input.placeholder}  onChange={(e) => handleInputOnChange(e, input.id)} />
                                    </div> */}
                                </div>
                                <CiSquarePlus />
                                {
                                    index > 0 && <CiSquareMinus />
                                }
                            </div>
                        </div>)
                    ))
                }
                <div>
                    <Button onClick={handleAddPerformanceButtonOnClick}>추가</Button>
                </div>
            </div>
        </div>
    );
}

export default AdminAddPerformance;