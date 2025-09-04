import { useMutation, useQueryClient } from "@tanstack/react-query"
import { reqUpdateComment } from "../../api/postApi";

export const usePostCommentUpdateQuery = (boardKey, postId) => {
    const query = useQueryClient();
    return useMutation({
        mutationKey: ["postCommentUpdate", boardKey, postId],
        mutationFn: ({postCommentId, commentContent}) => 
            reqUpdateComment({boardKey, postId, postCommentId, commentContent}),
        onSuccess: () => {
            query.invalidateQueries({queryKey: ["allComments", boardKey, postId]});
            query.invalidateQueries({queryKey:["PostDetail", boardKey, postId]});
        },
    });
};