export const Empty = () => {
    // Renders
    return (
        <div className='w-full flex items-center justify-center p-8'>
        <div className="w-full max-w-[60rem] h-48 md:h-[30rem] glassCard flex flex-col justify-center items-center self-center gap-2 p-4">
          <h2 className="text-lg md:text-2xl text-center">No weather forecast available</h2>
          <p className="text-xs md:text-sm text-center">Please enter an address for the weather forecast</p>
        </div>
      </div>
    );
}
