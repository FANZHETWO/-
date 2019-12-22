const _fun2 = () => { }
class Point {
    fun1() {
        _fun2.call(this);
    }
}