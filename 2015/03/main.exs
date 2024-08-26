# Example values
#
# > = 2 -> initial house + 1
# ^>v< = 4 -> initial + 3 (initial receives two times)
# ^v^v^v^v^v = 2 -> initial + 1 (initial and above receives multiples times)
defmodule Resolve do
  def read_file(filename) do
    {_, file} = File.read(filename)
    file
      |> String.trim()
      |> String.split("")
      |> Enum.filter(fn letter -> String.length(letter) !== 0 end)
      |> Enum.map(fn letter -> 
        cond letter do
          ">" ->
            [0, 1]
          "v" ->
            [-1, 0]
          "\^" ->
            [1, 0]
          "<" ->
            [0, -1]

        end
      end)
  end

  def part_one(file) do
    file = read_file(file)
    IO.inspect(file)
  end
end

Resolve.part_one("example")
