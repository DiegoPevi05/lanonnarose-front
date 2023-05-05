import { FC, useState} from 'react';
import {Logo,PeruFlag,UsaFlag} from '../assets/images';
import { Menu, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../constants/index';

interface INavigation {
  name: string;
  label: string;
  href: string;
}

const navigation:INavigation[] = [
  { name: 'home',label:'Home', href: '#' },
  { name: 'us', label:'Us',href: '#us' },
  { name: 'catalog',label:'Catalog', href: '#catalog' },
  { name: 'blog',label:'Blog' ,href: '#blog' },
  { name: 'contact',label:'Contact Us', href: '#contact' }
]

const Navbar: FC = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { i18n, t } = useTranslation()

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value)
    }

  return(
    <div className="relative top-0 z-40 h-full w-full">
      <nav className="flex flex-row justify-between items-center w-full h-full px-8 sm:px-16 lg:px-24">
        <div className="flex justify-center items-center py-4">
          <a href="/" className="w-full h-full">
            <img src={Logo} alt="logo" className="h-16 sm:h-24 w-auto rounded-full border-4 border-primary"/> 
          </a>
        </div>
        <ul className="hidden lg:flex flex-row justify-between items-center">
          {navigation.map((item,index)=>(
            <a key={"Link_"+index} 
              href={item.href}
            >
              <li key={"Link_"+item.name} className="mx-4 text-2xl font-bold font-heading text-primary hover:text-tertiary ease-in-out duration-300">{t(item.label)}</li>
            </a>
          ))}
          <div className="flex flex-row gap-2 justify-center items-center bg-primary py-1 px-2 rounded-md">
            <img src={i18n.language == 'en' ? UsaFlag : PeruFlag} className="h-6 w-auto"/>
            <select 
              className="text-md rounded-md font-bold bg-primary text-white hover:text-secondary ease-in-out duration-300"
              defaultValue={i18n.language} 
              onChange={onChangeLang}>
              {
                LANGUAGES.map(({ code, label }) => (
                    <option
                        key={code}
                        value={code}
                    >{t(label)}</option>
                ))
              }
            </select>
          </div>
        </ul>
        <div className="flex lg:hidden">
          <div className="flex flex-row gap-2 justify-center items-center bg-primary py-1 px-2 mr-2 rounded-md">
            <img src={i18n.language == 'en' ? UsaFlag : PeruFlag} className="h-6 w-auto"/>
            <select 
              className="text-md rounded-md font-bold bg-primary text-white hover:text-secondary ease-in-out duration-300"
              defaultValue={i18n.language} 
              onChange={onChangeLang}>
              {
                LANGUAGES.map(({ code, label }) => (
                    <option
                        key={code}
                        value={code}
                    >{t(label)}</option>
                ))
              }
            </select>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu Principal</span>
            <Menu className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-secondary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">La Nonna Rose</span>
              <img
              className="h-24 w-auto rounded-full border-4 border-primary"
                src={Logo}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar Menu</span>
              <X className="h-10 w-10 text-primary" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 hover:bg-gray-50"
                  >
                    {t(item.label)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default Navbar;
