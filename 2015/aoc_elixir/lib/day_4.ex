defmodule Resolver do
  def find_hash(pass, pattern, count) do
    md5 = Base.encode16(:erlang.md5(pass <> Integer.to_string(count)))
    p = String.match?(md5, pattern)
    case p do
      true ->
        { md5, count }
      false ->
        new_c = count + 1
        find_hash(pass, pattern, new_c)
    end
  end
end

filename = "iwrupvqb"
part_one = ~r/^0{5}/
part_two = ~r/^0{6}/

Resolver.find_hash(filename, part_one, 0)
  |> IO.inspect()

Resolver.find_hash(filename, part_two, 0)
  |> IO.inspect()

