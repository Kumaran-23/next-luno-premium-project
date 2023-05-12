export function add(...args) {
  return args.reduce((sum, el) => sum + el, 0)
}