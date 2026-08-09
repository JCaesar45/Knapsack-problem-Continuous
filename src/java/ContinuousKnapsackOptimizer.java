import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public final class ContinuousKnapsackOptimizer {
    public static final class Item {
        public final String name;
        public final double weight;
        public final double value;

        public Item(String name, double weight, double value) {
            this.name = name;
            this.weight = weight;
            this.value = value;
        }
    }

    public static final class Selection {
        public final String name;
        public final double weight;
        public final double value;
        public final double fraction;

        public Selection(String name, double weight, double value, double fraction) {
            this.name = name;
            this.weight = weight;
            this.value = value;
            this.fraction = fraction;
        }
    }

    public static final class Result {
        public final double totalValue;
        public final double totalWeight;
        public final List<Selection> selections;

        public Result(double totalValue, double totalWeight, List<Selection> selections) {
            this.totalValue = totalValue;
            this.totalWeight = totalWeight;
            this.selections = selections;
        }
    }

    private static double ratio(Item item) {
        return item.weight > 0 ? item.value / item.weight : 0.0;
    }

    public static Result optimize(List<Item> items, double capacity) {
        List<Item> sorted = new ArrayList<>(items);
        sorted.sort((a, b) -> Double.compare(ratio(b), ratio(a)));

        double remaining = capacity;
        double totalValue = 0.0;
        double totalWeight = 0.0;
        List<Selection> selections = new ArrayList<>();

        for (Item item : sorted) {
            if (remaining <= 0.0) {
                break;
            }

            if (item.weight <= 0.0) {
                continue;
            }

            double takeWeight = Math.min(item.weight, remaining);
            double fraction = takeWeight / item.weight;
            double takeValue = item.value * fraction;

            selections.add(new Selection(item.name, takeWeight, takeValue, fraction));

            totalWeight += takeWeight;
            totalValue += takeValue;
            remaining -= takeWeight;
        }

        return new Result(totalValue, totalWeight, Collections.unmodifiableList(selections));
    }

    public static void main(String[] args) {
        List<Item> demo = Arrays.asList(
            new Item("Direct Atelier", 3.0, 95.0),
            new Item("Heritage Email", 3.6, 90.0),
            new Item("Affiliate Vault", 2.5, 56.0)
        );

        Result result = optimize(demo, 5.0);
        System.out.println(result.totalValue);
    }
}
