fn main() {
    let input = include_str!("../../../input")
        .trim_end()
        .chars();

    let mut buf: Vec<char> = Vec::new();

    for (i, item) in input.enumerate() {
        buf.push(item);
        if buf.len() > 4 {
            buf.remove(0);

            let mut tmp_buf = buf.clone();
            tmp_buf.sort();
            tmp_buf.dedup();

            if buf.len() == tmp_buf.len() {
                println!("{}", i + 1);
                return;
            }
        }
    }
}
