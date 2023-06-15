import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { css } from "styled-components/native";

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;

    min-height: 56px;
    max-height: 56px;

    background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.colors.green_700 : theme.colors.red_dark};

    border-radius: 6px;

    justify-content: center;
    align-items: center;

    margin-top: 20px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.font_size.md}px;
        color: ${theme.colors.white};
        font-family: ${theme.font_family.bold};
    `};

    


`;