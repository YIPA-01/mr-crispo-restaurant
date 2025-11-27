import { h } from 'vue'
import type { VNode, Slots } from 'vue'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function for merging classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface NavigationMenuProps {
  delayDuration?: number
  skipDelayDuration?: number
  $slots?: Slots
}

export const NavigationMenu = {
  name: 'NavigationMenu',
  props: {
    delayDuration: {
      type: Number,
      default: 200
    },
    skipDelayDuration: {
      type: Number,
      default: 300
    }
  },
  render(this: NavigationMenuProps) {
    return h('div', {
      class: cn('relative flex max-w-max flex-1 items-center justify-center'),
    }, this.$slots?.default?.())
  }
}

interface NavigationMenuListProps {
  $slots?: Slots
}

export const NavigationMenuList = {
  name: 'NavigationMenuList',
  render(this: NavigationMenuListProps) {
    return h('div', {
      class: cn('group flex flex-1 list-none items-center justify-center space-x-1')
    }, this.$slots?.default?.())
  }
}

interface NavigationMenuItemProps {
  $slots?: Slots
}

export const NavigationMenuItem = {
  name: 'NavigationMenuItem',
  render(this: NavigationMenuItemProps) {
    return h('div', {
      class: cn('relative')
    }, this.$slots?.default?.())
  }
}

interface NavigationMenuTriggerProps {
  class?: string
  $slots?: Slots
}

export const NavigationMenuTrigger = {
  name: 'NavigationMenuTrigger',
  props: {
    class: String
  },
  render(this: NavigationMenuTriggerProps) {
    return h('button', {
      class: cn(
        'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:opacity-50 disabled:pointer-events-none data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
        this.class
      )
    }, this.$slots?.default?.())
  }
}

interface NavigationMenuContentProps {
  $slots?: Slots
}

export const NavigationMenuContent = {
  name: 'NavigationMenuContent',
  render(this: NavigationMenuContentProps) {
    return h('div', {
      class: cn(
        'absolute left-0 top-full z-[1] mt-2 w-full rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in slide-in-from-top-2'
      )
    }, this.$slots?.default?.())
  }
}

interface NavigationMenuLinkProps {
  asChild?: boolean
  href?: string
  $slots?: Slots
}

export const NavigationMenuLink = {
  name: 'NavigationMenuLink',
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: '#'
    }
  },
  render(this: NavigationMenuLinkProps) {
    // If asChild is true, render the first child directly
    if (this.asChild && this.$slots?.default) {
      const child = this.$slots.default()[0] as VNode

      // If the child is a Vue component or element, add href prop
      if (child.props) {
        child.props.href = this.href
      }

      return child
    }

    // Otherwise, render as a standard link
    return h('a', {
      href: this.href,
      class: cn(
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
      )
    }, this.$slots?.default?.())
  }
}

export default {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
}
