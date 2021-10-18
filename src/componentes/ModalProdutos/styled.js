import styled from "styled-components";

export const Container = styled.div`
    display: ${props=>props.status ? 'flex' : 'none'};
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center
`

export const ModalBody = styled.div`
    background-color:#FFF;
    border-radius: 20px;
    box-shadow: 0px 0px 50px #000;
    max-height: 95vh;
    max-width:100vw;
    overflow:auto;
    
    form {
        background-color:#fff;
        border-radius:3px;
        padding:10px;
        box-shadow:0px 0px 3px #999;
        margin:auto;
    
        .area {
            display:flex;
            align-items:center;
            padding:10px;
            max-width:500px;
    
            .area--title {
                width: 200px;
                text-align:right;
                padding-right:20px;
                font-weight:bold;
                font-size:14px;
            }
            .area--input {
                flex:1;
    
                input, select, textarea {
                    width:100%;
                    font-size:14px;
                    padding:5px;
                    border:1px solid #DDD;
                    border-radius:3px;
                    outline:0;
                    transition:all ease .4s;
    
                    &:focus {
                        border:1px solid #333;
                        color:#333;
                    }
                }
    
                textarea {
                    height:150px;
                    resize:none;
                }
    
                .boxx {
                    width: auto
                }
                button {
                    background-color:#0089FF;
                    border:0;
                    outline:0;
                    padding:5px 10px;
                    border-radius:4px;
                    color:#FFF;
                    font-size:15px;
                    cursor:pointer;
    
                    &:hover {
                        background-color:#006FCE
                    }
                }
            }
        }
    }
    @media (max-width:600px) {
        form {
            .area {
                flex-direction:column;
    
                .area--title {
                    width:100%;
                    text-align:left;
                    margin-bottom:10px;
                }
                .area--input {
                    width:100%;
    
                    button {
                        width:100%;
                        padding:10px;
                    }
                }
            }
        }
    }
`