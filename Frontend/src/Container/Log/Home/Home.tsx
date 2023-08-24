import React from 'react';
import HomeForm from './HomeForm'
import LogGeneral from '../LogGeneral'

interface Props {
}

const Home = (props:Props) => 
{
  return(<LogGeneral childComponet = {<HomeForm />}/>);
};

export default Home;
