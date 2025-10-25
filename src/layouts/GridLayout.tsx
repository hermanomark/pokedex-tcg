const GridLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
      {children}
    </div>
  )
}

export default GridLayout;