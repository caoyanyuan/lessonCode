function Vue(opts) {
    this.data = opts.data
    observe(opts.data, this);

    const dom = new Compile(opts.el, this)
    
    document.getElementById(opts.el).appendChild(dom)
}