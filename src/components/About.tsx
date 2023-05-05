import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../components/ui/hoc";
import {  textVariant,slideIn } from "../lib/motions";
import { LogoAbout  } from "../assets/images"
import {Facebook,Youtube,Instagram} from "lucide-react";
import {useTranslation} from 'react-i18next'
import { webContentLanguage } from "../interfaces";


interface AboutCompProps {
  webContent?: webContentLanguage[];
}
const About = (props:AboutCompProps) => {
  const {webContent} = props;
  const {i18n} = useTranslation();

  return (
    <>
      <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden">
        <div className="w-full h-full flex-col">
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className='w-full flex items-center justify-center py-4 sm:py-0'
          >
            <img src={LogoAbout} alt='ImageAbout' className='relative w-full sm:w-[640px] h-[250px] sm:h-[640px] object-contain' />
          </motion.div>
        </div>
        <motion.div 
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-full h-[400px] sm:h-[600px] flex-col rounded-[20px] p-4 sm:p-6 bg-primary">
          <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText} text-white`}>
             {webContent?.find((item) => item.language === i18n.language)?.content.find((item) => item.name === "AboutHeader")?.content ?? ''}
            </p>
            <h2 className={`${styles.sectionHeadText} text-secondary md:text-[50px]`}>La Nonna Rose</h2>
          </motion.div>

          <motion.p
            className='mt-4 text-secondary text-justify text-[13px] leading-[15px] lg:text-[17px] lg:leading-[25px]'
          >
          {webContent?.find((item) => item.language === i18n.language)?.content.find((item) => item.name === "AboutDescription")?.content ?? ''}
          </motion.p>
          <motion.div className="flex flex-row w-full h-auto mt-2 md:mt-8">
            <a id={"facebook"} href="#" target="_blank" className="flex w-auto h-auto justify-center cursor-pointer mx-auto">
              <Facebook className={`${styles.sectionHeadText} text-secondary h-10 w-auto transform hover:-translate-y-2 transition-all duration-300`}/> 
            </a>
            <a id={"instagram"} href="#" target="_blank" className="flex w-auto h-auto justify-center cursor-pointer mx-auto">
              <Instagram  className={`${styles.sectionHeadText} text-secondary h-10 w-auto transform hover:-translate-y-2 transition-all duration-300`}/> 
            </a>
            <a id={"Youtube"} href="#" target="_blank" className="flex w-auto h-auto justify-center cursor-pointer mx-auto">
              <Youtube className={`${styles.sectionHeadText} text-secondary h-10 w-auto transform hover:-translate-y-2 transition-all duration-300`}/> 
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "us");
