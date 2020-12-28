import Main from '../components/main';

export const getCategory = (category)=>{
    let temp = new Main()
    temp.handleChangeCategory();
    return temp.state.active
}