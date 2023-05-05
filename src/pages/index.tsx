import { FC,useState, useEffect} from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Catalog from '../components/Catalog';
import Contact from '../components/Contact';
import About from '../components/About';
import Blog from '../components/Blog';
import {WebData} from '../interfaces'
import Loader from '../components/ui/Loader';

interface HomeProps {
  webData: WebData | undefined;
}

const Home:FC<HomeProps> = ({webData}) => {

  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    if(webData != null && webData != undefined){
      setLoading(false);
    }
  },[webData])



  if(loading || webData == undefined){
    return <Loader isLoading={loading}/>
  }else{
    return(
      <>
        <Navbar/>
        <Hero webContent={webData.webContent}/>
        <About webContent={webData.webContent}/>
        <Catalog webContent={webData.webContent} products={webData.products} isSection={false} />
        <Blog webContent={webData.webContent} blogs={webData.blogs}/>
        <Contact/>
      </>
    )
  }

}

export default Home;
