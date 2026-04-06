"use client"

import type { AnchorHTMLAttributes, MouseEvent } from "react"

interface HashLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      !href.startsWith("#") ||
      href.length <= 1 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    const target = document.getElementById(href.slice(1))

    if (!target) {
      return
    }

    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", href)
  }

  return <a href={href} onClick={handleClick} {...props} />
}
