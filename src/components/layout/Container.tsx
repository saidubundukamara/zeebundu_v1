import { cn } from '@/lib/utils'

export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1360px] px-4 md:px-8', className)} {...props} />
}
