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
        case letter do
          ">" -> [0, 1]
          "v" -> [-1, 0]
          "\^" -> [1, 0]
          "<" -> [0, -1]
        end
      end)
  end

  def part_one(file) do
    file
      |> Enum.scan(
        &([
          Enum.at(&1, 0) + Enum.at(&2, 0), 
          Enum.at(&1, 1) + Enum.at(&2, 1)
        ])
      )
      |> MapSet.new()
      |> MapSet.put([0,0])
      |> MapSet.size()
  end

  def part_two(file) do
    file
      |> Stream.with_index
      |> Enum.reduce([[],[]], fn ({x, i}, [evens, odds]) -> 
        case rem(i, 2) do
          0 -> [evens ++ [x], odds]
          _ -> [evens, odds ++ [x]]
        end
      end)
      |> Enum.map(fn point -> 
        point
        |> Enum.scan(
          &([
            Enum.at(&1, 0) + Enum.at(&2, 0), 
            Enum.at(&1, 1) + Enum.at(&2, 1)
          ])
        )
        |> MapSet.new()
        |> MapSet.to_list()
      end)
      |> Enum.flat_map(& &1)
      |> MapSet.new()
      |> MapSet.put([0,0])
      |> MapSet.size()
  end
end

file = Resolve.read_file("input")
values = Resolve.part_one(file)
splited_values = Resolve.part_two(file)

IO.inspect(values)
IO.inspect(splited_values, charlists: :as_lists)
