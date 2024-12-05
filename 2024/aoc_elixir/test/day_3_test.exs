defmodule Day3Test do
  use ExUnit.Case

  test "should return 161 for the example" do
    file = "./examples/day_3.txt"

    example = Day3.read_file(file)
    assert Day3.part_1(example) == 161
  end
end
