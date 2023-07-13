import Image from 'next/image'
import spinner from '../../assets/spinner.svg'

export function Spinner() {
  return (
    <span className="mx-auto my-auto items-center">
      <Image src={spinner} alt="spinner image" className="animate-spin" />
    </span>
  )
}
