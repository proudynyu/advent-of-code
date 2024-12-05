defmodule Day3 do
  def read_file(file) do
    File.read!(file)
    |> String.trim()
  end

  def replace_and_multiply(s) do
    s
    |> String.replace(~r/[mul\(\)]/, "")
    |> String.split(",")
    |> List.flatten()
    |> Enum.map(&String.to_integer/1)
    |> Enum.reduce(1, fn x, acc -> x * acc end)
  end

  def part_1(s) do
    Regex.scan(~r/mul\(\d{0,3},\d{0,3}\)/, s)
    |> List.flatten()
    |> Enum.map(&replace_and_multiply/1)
    |> Enum.sum()
  end

  def active_deactive([], _, acc), do: acc
  def active_deactive([head | tail], mode, acc) do
    case head do
      0 -> active_deactive(tail, :dead, acc)
      1 -> active_deactive(tail, :alive, acc)
      _ -> 
        value = case mode do
          :dead -> 0
          :alive -> replace_and_multiply(head)
        end
          
        active_deactive(tail, mode, acc + value)
    end
  end

  def part_2(s) do
    deactived = "don't()"
    actived = "do()"

    list = Regex.scan(~r/don't\(\)|do\(\)|mul\(\d{0,3},\d{0,3}\)/, s)
    |> List.flatten()
    |> Enum.map(fn x ->
      cond do
        x === deactived -> 0
        x === actived -> 1
        true -> x
      end
    end)

    active_deactive(list, :alive, 0)
  end
end

file = "../inputs/day_3.txt"

Day3.read_file(file)
|> Day3.part_1
|> IO.inspect

Day3.read_file(file)
|> Day3.part_2()
|> IO.inspect()
