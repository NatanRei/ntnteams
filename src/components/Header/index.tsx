import { BackButton, BackIcon, Container, Logo } from './styles';


import logoImg from '@assets/logo.png'

type Props = {
    showBlackButton?: boolean;
}

export function Header({ showBlackButton = false }: Props) {
    return (
        <Container>
            {
            showBlackButton && 
            <BackButton>
                <BackIcon />
            </BackButton>
            }
            <Logo source={logoImg} />
        </Container>
    )
}