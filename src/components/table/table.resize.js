import { $ } from '@core/dom'
export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  $resizer.css({
    [sideProp]: '-5000px',
    opacity: 1
  })
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = delta + coords.width
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      value = delta + coords.height
      $resizer.css({ bottom: -delta + 'px' })
    }
  }
  document.onmouseup = () => {
    $resizer.css({
      bottom: 0,
      right: 0,
      opacity: 0
    })
    if (type === 'col') {
      $root.all(`[data-col="${$parent.data.col}"]`)
          .forEach(c => c.style.width = value + 'px')
    } else {
      $parent.css({ height: value + 'px' })
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}
