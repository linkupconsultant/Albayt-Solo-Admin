'use client'

import Link from 'next/link';
import React, { useState } from 'react'

const Sidebar_Alt = () => {
    const [open, setOpen] = useState(true);

  return (
    <>
        <div className={`bg-[#f14310] h-screen pt-8 w-72 relative duration-300 ${open ? 'w-72' : 'w-[5rem] p-0'}`}>
            <div onClick={() => setOpen (!open)} className={`absolute -right-4 top-9 w-8 h-8 rounded-full bg-white border z-10 flexCenter cursor-pointer ${!open && 'rotate-180'} duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-[#f14310] p-1'><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
            </div>

            <div className='flexCenter gap-2'>
                <svg width="40" height="40" viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="M12.716 9.927l5.403 1.661 2.447-1.245c1.325-.595 3.421-.105 3.434 1.45.009.856-.595 1.927-1.495 2.425l-2.405 1.225-1.836 5.361-2.493 1.196-.263-4.219-1.707.869-.674 1.809-2.19 1.022-.465-3.566-2.617-2.554 2.126-1.093 1.839.527 1.709-.87-3.289-2.73 2.476-1.268zm-3.612 10.639c-4.86 1.436-8.711-3.301-9.104-5.566 1.498 1.65 4.118 2.901 7.188 2.084l1.111 1.085c-1.034.424-2.599.681-3.932.407 1.385.872 2.688 1.133 4.562.653l.175 1.337zm13.177-8.665c-.14-.06-.656-.194-.961-.02l-3.068 1.559-5.094-1.767 3.428 2.615-4.463 2.275-1.616-.704 1.465 1.321.085 1.839.566-1.667 4.289-2.124.221 3.92 1.562-4.865s2.713-1.424 3.104-1.637c.372-.204.482-.745.482-.745m-22.268.61l-.013-.511c0-5.522 4.477-10 10-10 4.462 0 8.243 2.924 9.529 6.961 0 0-1.078.561-1.576.815-.055-.113-4.737-1.474-4.737-1.474-.372-.112-.75-.137-1.372.161l-.271-.404c-.096-.063-.844-.588-.64-.245l.657.654c-.032.022-.172-.239-.172-.048.027-.074.026.152-.007.265l-.073.037-.008-.014c-.045-.074.074-.115.005-.223 0-.071-.188-.14-.226-.188-.105-.129-.381-.414-.531-.483-.042-.019-.637.073-.687.092l-.149.259c-.124.046-.239.105-.349.179l-.131.293c-.058.051-.638.243-.641.25.025-.063-.406-.143-.378-.268.032-.137.178-.566.14-.723-.04-.165.895.237.957-.197.023-.186.037-.405-.262-.437.056.006.579-.205.665-.3.122-.14.401-.369.604-.369.237 0 .185-.344.294-.513.109.044-.058.313.073.423-.009-.086.37.047.407.027.088-.046.571-.019.496-.247-.084-.23.042-.162.151-.21-.02.007.282-.516.335-.344-.036-.177-.351.061-.461.053-.253-.021-.147-.434-.05-.555.074-.096-.203-.213-.206-.03-.005.274-.26.522-.202.887.092.55-.612-.132-.673-.095-.233.141-.424-.178-.303-.371.123-.195.42-.185.543-.395.086-.149.187-.321.321-.434.446-.374.569-.074 1.012-.034.436.04.147.104.088.27-.058.159.238.215.341.083.057-.077.191-.269.248-.412.074-.185.751-.164.278-.447-.311-.185-1.67-.56-2.58-.56-.196 0-.334.219-.484.344-.297.246-1.055.728-1.479.582-.432-.15-1.358.549-1.507.555-.055.002.002-.53.298-.568-.129.018 1.039-.59 1.008-.717-.039-.15-2.333.685-2.231.854.048.075.25.075-.013.245-.15.089-.311.666-.452.666-.421.184-.447-.362-.915.341l-.745.301c-1.106 1.175-1.872 2.664-2.15 4.319-.011.066.279.187.316.233.093.112.093.594.139.751.116.398.399.62.617.982.128.216.342.762.274.989.091-.148.893.679 1.039.852.303.357.546.78.217 1.151-2.727-.374-4.378-3.058-4.378-3.058m7.265 1.234c-.682-.452-.875-1.46-.632-2.23.031-.159-.095-.452-.04-.574.131-.294.401-.623.635-.846.132-.125.301-.093.456-.19.239-.15.242-.46.477-.65.333-.272.788-.266 1.223-.324.232-.031 1.113-.222 1.253-.05l.041.173-1.225.627c-.908.498-1.143 1.516-.75 2.267.168.318.654.734.654.734-.084.034-2.092 1.063-2.092 1.063m1.882-7.496l.09-.026-.042.114c.071.129.018.207.007.277l-.125.076c-.044.056.215.064.218.071.009.028-.313.074-.253.143.079.113.687-.163.59-.147.187-.094.025-.104-.081-.159-.036-.178-.065-.455-.177-.566l.073-.084c-.172-.25-.3.301-.3.301m-.429.455c-.072.029-.142-.017-.073-.087l.073-.088-.007-.04.058-.073.06-.015.124-.087c.036.008.122.079.092.123l-.066.082c-.015.139-.155.138-.259.184l-.002.001.002-.001-.002.001"/></svg>
                <h1 className={`text-white font-semibold text-xl ${!open && 'hidden'}`}>Albayt Solo</h1>
            </div>

            <div className='border border-b-2 border-white rounded-full mt-7 mx-5'/>

            <div className='mt-2'>
                <ul className='font-bold text-lg text-white'>
                    <Link href={'/'}>
                        <li className={`py-3 px-5 flex gap-3 items-center duration-200 hover:bg-black hover:bg-opacity-15 rounded-lg ${!open && 'justify-center'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg>
                            <p className={`${!open && 'hidden'}`}>Dashboard</p>
                        </li>
                    </Link>
                    <Link href={'/PaketPage'}>
                        <li className={`py-3 px-5 flex gap-3 items-center duration-200 hover:bg-black hover:bg-opacity-15 rounded-lg ${!open && 'justify-center'}`}>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="M7 16.462l1.526-.723c1.792-.81 2.851-.344 4.349.232 1.716.661 2.365.883 3.077 1.164 1.278.506.688 2.177-.592 1.838-.778-.206-2.812-.795-3.38-.931-.64-.154-.93.602-.323.818 1.106.393 2.663.79 3.494 1.007.831.218 1.295-.145 1.881-.611.906-.72 2.968-2.909 2.968-2.909.842-.799 1.991-.135 1.991.72 0 .23-.083.474-.276.707-2.328 2.793-3.06 3.642-4.568 5.226-.623.655-1.342.974-2.204.974-.442 0-.922-.084-1.443-.25-1.825-.581-4.172-1.313-6.5-1.6v-5.662zm-1 6.538h-4v-8h4v8zm15-11.497l-6.5 3.468v-7.215l6.5-3.345v7.092zm-7.5-3.771v7.216l-6.458-3.445v-7.133l6.458 3.362zm-3.408-5.589l6.526 3.398-2.596 1.336-6.451-3.359 2.521-1.375zm10.381 1.415l-2.766 1.423-6.558-3.415 2.872-1.566 6.452 3.558z"/></svg>
                            <p className={`${!open && 'hidden'}`}>Paket Albayt</p>
                        </li>
                    </Link>
                    <Link href={'/Blog'}>
                        <li className={`py-3 px-5 flex gap-3 items-center duration-200 hover:bg-black hover:bg-opacity-15 rounded-lg ${!open && 'justify-center'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M21.155 8.64c-.909 1.519-2.327 3.067-4.097 3.004-.413.706-.852 1.677-1.339 2.803l-1.312.553c.936-2.343 2.231-4.961 3.698-6.994-.67.529-1.746 1.637-2.662 2.783-1.098-1.828-.3-3.691.973-5.179.021.641.359 1.196.601 1.475-.087-.53-.114-1.489.195-2.351.718-.732 1.364-1.271 2.113-1.76-.083.478.08 1.026.262 1.361.024-.49.224-1.43.521-1.84.924-.727 2.332-1.373 3.892-1.495-.081.973-.436 2.575-1.024 3.604-.515.404-1.221.68-1.791.833.493.089 1.031.077 1.494-.001-.269.743-.552 1.428-.998 2.276-.679.468-1.578.732-2.203.825.46.187 1.272.245 1.677.103zm-13.841 3.805l.645.781 4.773-2.791-.668-.768-4.75 2.778zm6.96-.238l-.668-.767-4.805 2.808.645.781 4.828-2.822zm4.679.007c-.421.203-.851.341-1.286.398-.12.231-.246.494-.377.773l.298.342c.623.692.459 1.704-.376 2.239-.773.497-5.341 3.376-6.386 4.035-.074-.721-.358-1.391-.826-1.948-.469-.557-6.115-7.376-7.523-9.178-.469-.6-.575-1.245-.295-1.816.268-.549.842-.918 1.43-.918.919 0 1.408.655 1.549 1.215.16.641-.035 1.231-.623 1.685l1.329 1.624 7.796-4.446c1.422-1.051 1.822-2.991.93-4.513-.618-1.053-1.759-1.706-2.978-1.706-1.188 0-.793-.016-9.565 4.475-1.234.591-2.05 1.787-2.05 3.202 0 .87.308 1.756.889 2.487 1.427 1.794 7.561 9.185 7.616 9.257.371.493.427 1.119.15 1.673-.277.555-.812.886-1.429.886-.919 0-1.408-.655-1.549-1.216-.156-.629.012-1.208.604-1.654l-1.277-1.545c-.822.665-1.277 1.496-1.377 2.442-.232 2.205 1.525 3.993 3.613 3.993.596 0 1.311-.177 1.841-.51l9.427-5.946c.957-.664 1.492-1.781 1.492-2.897 0-.745-.24-1.454-.688-2.003l-.359-.43zm-7.933-10.062c.188-.087.398-.134.609-.134.532 0 .997.281 1.243.752.312.596.226 1.469-.548 1.912l-5.097 2.888c-.051-1.089-.579-2.081-1.455-2.732l5.248-2.686zm2.097 13.383l.361-.905.249-.609-3.449 2.017.645.781 2.194-1.284z"/></svg>
                            <p className={`${!open && 'hidden'}`}>Blog</p>
                        </li>
                    </Link>
                    <Link href={'/Galeri'}>
                        <li className={`py-3 px-5 flex gap-3 items-center duration-200 hover:bg-black hover:bg-opacity-15 rounded-lg ${!open && 'justify-center'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"/></svg>
                            <p className={`${!open && 'hidden'}`}>Galeri</p>
                        </li>
                    </Link>
                    <Link href={'/Testimoni'}>
                        <li className={`py-3 px-5 flex gap-3 items-center duration-200 hover:bg-black hover:bg-opacity-15 rounded-lg ${!open && 'justify-center'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white'><path d="M14.969 13.547l.031.191c0 .193-.096.379-.264.496-.538.372-.467.278-.67.885-.084.253-.33.424-.605.424h-.002c-.664-.002-.549-.038-1.083.338-.112.08-.244.119-.376.119s-.264-.039-.376-.118c-.534-.376-.419-.34-1.083-.338h-.002c-.275 0-.521-.171-.605-.424-.203-.607-.133-.513-.669-.885-.169-.118-.265-.304-.265-.497l.031-.19c.207-.604.208-.488 0-1.094l-.031-.191c0-.193.096-.379.265-.497.536-.372.466-.277.669-.885.084-.253.33-.424.605-.424h.002c.662.002.544.041 1.083-.338.112-.08.244-.119.376-.119s.264.039.376.118c.534.376.419.34 1.083.338h.002c.275 0 .521.171.605.424.203.607.132.513.67.885.168.118.264.304.264.497l-.031.191c-.207.604-.208.488 0 1.094zm-1.469-1.198l-.465-.464-1.41 1.446-.66-.627-.465.464 1.125 1.091 1.875-1.91zm8.5-4.349v14h-20v-14h20zm2-2h-24v18h24v-18zm-5 11h-14v1h14v-1zm0 2h-14v1h14v-1zm-7-19c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm-4.74 5l2.771-1.979c-.206-.267-.36-.574-.446-.91l-4.045 2.889h1.72zm11.2 0l-4.044-2.889c-.086.336-.24.643-.446.91l2.77 1.979h1.72z"/></svg>
                            <p className={`${!open && 'hidden'}`}>Testimoni</p>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Sidebar_Alt