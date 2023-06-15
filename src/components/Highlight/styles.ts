import styled from "styled-components/native";
import { css } from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    margin: 32px 0;
`

export const Title = styled.Text`
    text-align: center;

    ${({ theme }) => css`
        font-size: ${theme.font_size.xl}px;
        font-family: ${theme.font_family.bold}; 
        color: ${theme.colors.white}; 
    `};

    

`;

export const SubTitle = styled.Text`
    text-align: center;

    ${({ theme }) => css`
        font-size: ${theme.font_size.md}px;
        font-family: ${theme.font_family.regular}; 
        color: ${theme.colors.gray_300}; 
    `};


`;