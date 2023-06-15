import { MaterialIcons } from '@expo/vector-icons';
import styled from "styled-components/native";
import { css } from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    height: 56px;

    background-color: ${({ theme }) => theme.colors.gray_500};

    flex-direction: row;
    align-items: center;

    margin-bottom: 16px;
    border-radius: 6px;

`;

export const Name = styled.Text`
    flex: 1;
    ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    color: ${theme.colors.gray_200};
    font-family: ${theme.font_family.regular};

    `}
`;

export const Icon = styled(MaterialIcons).attrs(({ theme}) => ({
    size: 24,
    color: theme.colors.gray_200,
}))`
    margin-left: 16px;
    margin-right: 4px;
`;