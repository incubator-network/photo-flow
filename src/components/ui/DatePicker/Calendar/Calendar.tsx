import ArrowLeft from '../../../../assets/Arrow left.svg'

export const Calendar = () => {
  const days = [
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '21/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
    { date: '11/11/2121' },
  ]

  return (
    <div
      className={`
    border 
    border-dark-300 
    rounded-sm 
    w-[300px] 
    h-[348px]
    bg-dark-500
      font-normal 
      leading-6 
      text-base 
      text-light-100
      py-4
      px-6
      flex
      gap-3
      flex-col

      text-center 
    `}
    >
      <div className={`flex justify-between items-center`}>
        <p className={`font-bold`}>November 2023</p>
        <div className={`flex gap-0.5`}>
          <button
            className={`
              flex
              items-center
              justify-center
              bg-dark-100
              rounded-3xl
              p-2
              w-9
              h-9
            `}
          >
            <ArrowLeft className={`text-light-100 w-5 h-5`} />
          </button>
          <button
            className={`
              flex
              items-center
              justify-center
              bg-dark-100
              rounded-3xl
              p-2
              w-9
              h-9
            `}
          >
            <ArrowLeft
              className={`text-light-100 w-5 h-5 transform rotate-180`}
            />
          </button>
        </div>
      </div>

      <div className={`flex text-dark-100 items-center justify-center`}>
        <p className={`w-[36px] h-[40px] flex justify-center items-center`}>
          Mo
        </p>
        <p className={`w-[36px] h-[40px] flex justify-center items-center`}>
          Tu
        </p>
        <p className={`w-[36px] h-[40px] flex justify-center items-center`}>
          We
        </p>
        <p className={`w-[36px] h-[40px] flex justify-center items-center`}>
          Th
        </p>
        <p className={`w-[36px] h-[40px] flex justify-center items-center`}>
          Fr
        </p>
        <p className={`w-[36px] h-[40px] flex justify-center items-center`}>
          Sa
        </p>
        <p className={`w-[36px] h-[40px] flex justify-center items-center`}>
          Su
        </p>
      </div>

      <div className={`grid grid-cols-7 grid-rows-6`}>
        {days.map(day => {
          return (
            <p
              key={day.date}
              className={`
            flex
            justify-center
            items-center
            h-9
            w-9
            `}
            >
              22
            </p>
          )
        })}
      </div>
    </div>
  )
}
