import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.gray_700};

    padding: 24px;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;