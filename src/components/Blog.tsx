import { useState, useEffect} from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import { fadeIn,textVariant } from "../lib/motions";
import { BgCatalog2} from "../assets/images"
import {useTranslation} from 'react-i18next'
import { webContentLanguage,BlogSection,Blog } from "../interfaces";

interface CarouselImagesProps{
  images:string[];
}
const CarouselImages = ({images}:CarouselImagesProps) => {

  const [CurrentImage,setCurrentImage] = useState<number>(0);

  return(
      <>
        <img src={images[CurrentImage]} className="absolute w-full h-full object-cover z-[11]"/> 
        <div className="absolute bottom-0 h-auto w-full flex flex-row justify-center items-center z-[20] py-2 gap-2">
          {images.map((_,index) => (
            <span key={"Span_"+index} onClick={()=>setCurrentImage(index)} className={`h-5 w-5 bg-primary rounded-full transition-all duration-300 ease-in-out hover:bg-secondary hover:ring-2 hover:ring-slate-400 hover:ring-offset-2 ${CurrentImage == index? "ring-2 ring-slate-400 ring-offset-2 bg-secondary": ""}`}/>
          ))}
        </div>
      </>

  )
}

interface BlogCompProps {
  webContent?: webContentLanguage[];
  blogs?: BlogSection[];
}

const BlogComponent = (props:BlogCompProps) => {

  const {webContent,blogs} = props;

  const { i18n, t } = useTranslation()

  const [BlogData,setBlogData] = useState<Blog[]>([]);


  useEffect(() => {
    if(blogs != undefined && blogs.length > 0){
      var LanguageBlog = blogs.find(item => item.language === i18n.language);
      if(LanguageBlog){
        LanguageBlog.content = LanguageBlog.content?.filter(item => item.isImportant === true);
        if(LanguageBlog.content){
          setBlogData(LanguageBlog.content);
        }else{
          setBlogData([]);
        }
      }
    }
  }, [i18n.language,blogs])


  return (
    <div className="w-full h-full overflow-hidden">
      <motion.div variants={textVariant()} className="overflow-hidden">
        <p className={`${styles.sectionSubText} text-white`}>
          {webContent?.find((item) => item.language === i18n.language)?.content.find((item) => item.name === "BlogHeader")?.content ?? ''}
        </p>
        <h2 className={`${styles.sectionHeadText} text-primary md:text-[50px]`}>Blog</h2>
      </motion.div>
      <motion.div
        variants={fadeIn("left", "", 0.2, 1)}
        className='w-full h-[600px] sm:h-[700px] flex flex py-0 sm:py-0 overflow-hidden'
      >

        {BlogData.length > 0 && BlogData.map((blog,index) => (
          <div key={"Blog_"+index} className="relative w-[0px] flex-grow opacity-[0.8] transition-all duration-300 ease-in-out hover:w-[200px]">
            <img src={BgCatalog2} className="absolute top-0 left-0 w-full h-full object-cover z-[10]"/> 
            <div className="relative h-full w-full z-[20]">
              <div className="relative w-full h-full hover:h-1/3 sm:h-1/3 z-[10]">
                <CarouselImages images={blog.images}/>
              </div>
              <div className="flex flex-col w-full p-4">
                <p className="text-secondary text-md">{t('Dated the ')}{blog.date}</p>
                <h1 className="font-heading text-secondary text-md">{blog.title}</h1>
                <p className="font-heading text-secondary text-md">{blog.subTitle}</p>
                <p className="font-heading text-secondary text-sm mt-4">{t("Detail")}</p>
                <p className="font text-secondary text-md">{blog.description}</p>
                <div className="w-full h-0.5 bg-secondary my-4"></div>
                <p className="font-heading text-secondary text-sm">{t("BulletPoints")}</p>
                <ul className="list-disc pl-6">
                  {blog.BullletPoins.map((bullet,index)=> (
                  <li key={"Bullet_"+index} className="text-secondary text-sm ">
                    {bullet}
                  </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(BlogComponent, "blog");
