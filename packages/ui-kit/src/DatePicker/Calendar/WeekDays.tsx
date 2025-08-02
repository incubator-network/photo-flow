type WeekDaysPropsType = {
  weekDays: string[]
}

export const WeekDays = ({ weekDays }: WeekDaysPropsType) => {
  return (
    <ul className={`text-dark-100 flex items-center justify-center`}>
      {weekDays.map((wd, i) => {
        return (
          <li key={i} className={`flex h-[40px] w-[36px] items-center justify-center`}>
            {wd}
          </li>
        )
      })}
    </ul>
  )
}
