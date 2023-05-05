import {useState,useEffect} from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import { fadeIn, textVariant } from "../lib/motions";
import {Cake, IceCream,Apple,ExternalLink, X, Eye, Home } from "lucide-react"
import Button from '../components/ui/Button'
import { webContentLanguage,CatalogLanguage,CatalogProps,ProductProps } from "../interfaces";
import {BgCatalog1, BgCatalog2} from '../assets/images';
import {useTranslation} from 'react-i18next'
import { useNavigate } from "react-router-dom";

const BG_IMAGES = [BgCatalog1, BgCatalog2]

interface ProductDetailProps extends ProductProps {
  closeView: () => void;
}

const ProductDetail = (props:ProductDetailProps) => {
  const {closeView, title,description,image} = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return(
    <motion.div 
      initial='hidden'
      animate={show ? 'show' : 'hidden'}
      variants={fadeIn("", "", 0.1, 1)}
      className="relative w-full h-auto flex flex-col bg-white border-tertiary border-4 rounded-md p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
          <img 
            src={image}
            alt={"image_"+title}
            className="w-full h-auto sm:w-[200px] sm:h-[200px] shadow-card object-cover rounded-lg border-primary border-4 z-[2]" 
          />
        </div>
        <div className="relative flex flex-col justify-start items-start h-full w-full mt-10 md:mt-0 px-2 md:w-1/2">

            <Button type="button" className="absolute top-0 right-0" size="sm" onClick={() => closeView()}
            >
              <span className="sr-only">Cerrar Producto detail</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </Button>
          <h1 className="font-heading text-primary">{title}</h1>
          <p className="text-tertiary">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

interface DesertProps extends ProductProps {
  index: number;
  showProduct: (product: ProductProps) => void;
}


const DesertCard = (props:DesertProps) => {

  const {index,showProduct,id,title,shortDescription,description,image,isImportant} = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const {t} = useTranslation();
  return(
    <div className='relative xs:w-[250px] flex w-full rounded-lg hover:translate-y-[-15px] hover:z-[10] transition-all duration-300 ease-in-out'>
        <motion.div
          initial='hidden'
          animate={show ? 'show' : 'hidden'}
          variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          className='flex w-full h-[400px] rounded-lg  z-[1]'
        >
          <img 
            src={index % 2 > 0 ? BG_IMAGES[1] : BG_IMAGES[0]}
            alt={"image_"+title}
            className="absolute top-0 left-0 w-full h-full shadow-card object-cover rounded-lg border-primary border-4 z-[2]" 
          />
          <div className="h-full w-full flex flex-col justify-end  z-[3]">

            <img 
              src={image}
              alt={"image_"+title}
              className={`w-full h-full  object-cover border-t-4 border-x-4 rounded-t-lg mb-4 ${index % 2 > 0 ? "border-secondary": "border-primary"}`}
            />
            <div className="h-full w-full flex flex-col justify-end p-4">
              <h1 className="font-heading">{title}</h1>
              <h1 className={`text-sm ${index % 2 > 0 ? "text-secondary": ""}`}>{shortDescription}</h1>
              <Button onClick={()=>showProduct({id,title,shortDescription,description,image,isImportant})}size="sm" className={`px-1 w-1/2 ${index % 2 > 0 ? "bg-secondary text-primary": ""}`} >{t('View Detail')}<ExternalLink className="ml-2 pb-[1px] h-4 w-auto"/></Button>
            </div>
          </div>
        </motion.div>
      </div>
  )
}


interface CatalogCompProps {
  webContent: webContentLanguage[];
  products: CatalogLanguage[];
  isSection: boolean;
}

const CatalogComponent = (props:CatalogCompProps) => {

  const {webContent,products, isSection} = props;
  const { i18n, t } = useTranslation()
  const navigate = useNavigate();


  const [viewDetailProduct,setViewDetailProduct] = useState<ProductProps|null>(null);
  const [selectedOption,setSelectedOption] = useState<string>();
  const [optionsProducts,setOptionsProducts] = useState<string[]>([]);
  const [CatalogData,setCatalogData] = useState<CatalogProps>(
      {
        section:'Cakes',
        products:[]
      }
  );

  const showProduct = (product:ProductProps) => {
    setViewDetailProduct(product);
  }

  const closeView = () => {
    setViewDetailProduct(null);
  }

  const goToCatalog = () => {
    navigate('/catalog');
  }

  const goToHome = () => {
    navigate('/');
  }


  useEffect(()=>{
    if(products && products.length > 0){
      const languageProduct = products.find(item => item.language === i18n.language);
      if(languageProduct){
        setOptionsProducts(languageProduct.sections);
        setSelectedOption(languageProduct.sections[0]);
      }
    }
  },[i18n.language])

  useEffect(() => {

    if(products && products.length > 0){
      const DataLanguage = products.find(item => item.language === i18n.language );
      if(DataLanguage){
        var filterSection = DataLanguage.content.find(item => item.section === selectedOption);
        if(filterSection){
          if(!isSection){
            filterSection.products = filterSection.products.filter(item => item.isImportant === true); 
          }
          setCatalogData(filterSection);
        }else{
          setCatalogData({section:selectedOption ?? "",products:[]});
        }
      }
    }
  }, [selectedOption,i18n.language,products])

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('Catalog')}</p>
        <h2 className={styles.sectionHeadText}>{t(selectedOption || "").toString()}</h2>
        <div className="flex flex-row flex-wrap gap-2">
          {optionsProducts.map((section,index) => (
            <Button key={"ButtonCatg_"+index} onClick={() => setSelectedOption(section)} className={selectedOption == section ? "bg-tertiary":""} >
            {(section == 'Cakes' || section == 'Pasteles') &&
              <Cake className="mr-2"/>
            }
            {(section == 'Desserts' || section == 'Postres') &&
              <Apple className="mr-2"/>
            }
            {(section == 'Others' || section=='Otros') &&
              <IceCream className="mr-2"/>
            }
            {section}</Button>
          ))}
          {!isSection ? 
            <Button key={"GotToFullCatalog"} onClick={() => goToCatalog()}><Eye className="mr-2" />{t('See Full Catalog')}</Button>
            :
            <Button key={"GotToFullCatalog"} onClick={() => goToHome()}><Home className="mr-2"/>{t('Go Home Page')}</Button>
          }
        </div>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-primary text-[17px] max-w-3xl leading-[30px]'
      >
        {webContent?.find((item) => item.language === i18n.language)?.content.find((item) => item.name === "CatalogDescription")?.content ?? ''}
      </motion.p>

      {viewDetailProduct == null ?
        <div className='mt-20 flex flex-wrap gap-10 w-full'>
          {CatalogData!= null && CatalogData!= undefined && CatalogData.products.length > 0  && CatalogData.products.map((product, index) => (
              <DesertCard key={"product_index"+index} showProduct={showProduct} index={index} {...product} />
              ))
          }
        </div>
      :
        <div className='mt-4 flex h-full w-full'>
          <ProductDetail closeView={closeView} {...viewDetailProduct} />
        </div>
      }
    </>
  );
};

export default SectionWrapper(CatalogComponent, "catalog");
