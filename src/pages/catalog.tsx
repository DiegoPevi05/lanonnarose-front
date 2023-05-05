import { FC,useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Catalog from '../components/Catalog';
import {WebData} from '../interfaces'
import Loader from '../components/ui/Loader';


interface CatalogComponentProps {
  webData: WebData | undefined;
}

const CatalogComponent:FC<CatalogComponentProps> = ({webData}) => {

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
        <Catalog webContent={webData.webContent} products={webData.products} isSection={true} />
      </>
    )
  }

}

export default CatalogComponent;
