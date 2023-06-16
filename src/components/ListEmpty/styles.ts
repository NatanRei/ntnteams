import styled from "styled-components/native";
import { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Message = styled.Text`
 ${({ theme }) => css`
    color: ${theme.colors.gray_200};
    font-size: ${theme.font_size.md}px;

 `}   
`;