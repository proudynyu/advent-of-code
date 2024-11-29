defmodule Acc do
  defstruct [:east, :west, :north, :south, :last]

  def new do
    %Acc{east: 0, west: 0, north: 0, south: 0, last: nil}
  end
end

defmodule M do
  def open_file(file_name) do
    {_, file} = File.read(file_name)
    file
    |> String.split(", ")
    |> Enum.map(fn x -> String.trim(x) end)
  end

  def resolver_part_one(paths, acc) do
    resolve_path(paths, acc)
    |> resolve_values()
  end

  def resolve_values(%{east: e, west: w, north: n, south: s, last: _a}) do
    x = e - w
    y = n - s
    abs(x) + abs(y)
  end

  def resolve_path([], acc), do: acc
  def resolve_path([head | tail], %{east: e, west: w, north: n, south: s, last: a}) do
    dir = String.first(head)
    vel = String.split(head, dir) |> List.last() |> String.to_integer()

    case dir do
      "R" -> 
        case a do
          "R" -> resolve_path(tail, %Acc{east: e, west: w, north: n, south: s + vel, last: "S"})
          "L" -> resolve_path(tail, %Acc{east: e, west: w, north: n + vel, south: s, last: "N"})
          "N" -> resolve_path(tail, %Acc{east: e + vel, west: w, north: n, south: s, last: "R"})
          "S" -> resolve_path(tail, %Acc{east: e, west: w + vel, north: n, south: s, last: "L"})
          _ ->   resolve_path(tail, %Acc{east: e + vel, west: w, north: n, south: s, last: "R"})
        end
      "L" -> 
        case a do
          "R" -> resolve_path(tail, %Acc{east: e, west: w, north: n + vel, south: s, last: "N"})
          "L" -> resolve_path(tail, %Acc{east: e, west: w, north: n, south: s + vel, last: "S"})
          "N" -> resolve_path(tail, %Acc{east: e, west: w + vel, north: n, south: s, last: "L"})
          "S" -> resolve_path(tail, %Acc{east: e + vel, west: w, north: n, south: s, last: "R"})
          _ ->   resolve_path(tail, %Acc{east: e, west: w + vel, north: n, south: s, last: "L"})
        end
      _ -> nil
    end
  end
end

acc = Acc.new()
# IO.inspect(acc)

M.open_file("./input.txt")
  |> M.resolver_part_one(acc)
  |> IO.inspect()
