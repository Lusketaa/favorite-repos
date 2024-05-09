import styled, {keyframes, css} from 'styled-components';

export const Container = styled.div `
    max-width: 700px;
    background: #f1f3f5;
    border-radius: 4px;

    box-shadow: 0 0 20px rgba(0,0,0, 0.3);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg{
            margin-right: 10px;
        }
    }
`;

export const Form = styled.form `
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 1px solid #e9ecef;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

//Animação Loading
const animate = keyframes`
    from{
        transform: rotate(0deg);
    }to {
        transform: rotate(360deg);
    }
`


export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li{
            border-top: 1px solid #ced4da;
        }

        div{
            display: flex;
            align-items: center;
        }
        a{
            color: #002C7C;
            text-decoration: none;
        }
    }

`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    background: transparent;
    color: #f03e3e;
    border: 0;
    margin-right: 20px;
    outline: 0;
    border-radius: 4px;


`;


export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #002C7C;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    transition: opacity .7s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: .7;
    }

    ${props => props.loading && css`
        svg {
            animation: ${animate} 2s linear infinite;            
        }
    `}
`;



