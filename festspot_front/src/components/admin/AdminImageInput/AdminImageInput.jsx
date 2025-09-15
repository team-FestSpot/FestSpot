import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function AdminImageInput({imageUrl, setImageUrl, setImageFile}) {

    const handleImageUploadOnChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
        return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
        setImageUrl(e.target.result);
        };
        fileReader.readAsDataURL(file);
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
  };

    return (
        <>
            <div css={s.imgContainerLayout}>
                {imageUrl ? (
                <div css={s.imgContainer}>
                    <img src={imageUrl} alt="" />
                </div>
                ) : (
                <div css={s.emptyImgBox}></div>
                )}
            </div>
            <div css={s.imgInput}>
                <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadOnChange}
                />
            </div>
        </>
    );
}

export default AdminImageInput;