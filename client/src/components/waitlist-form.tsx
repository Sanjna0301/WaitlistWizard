import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

// Define the schema for the waitlist form
const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  reason: z.string().optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Initialize the form
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: '',
      email: '',
      reason: '',
    },
  });
  
  // Mutation for submitting the waitlist form
  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormValues) => {
      const res = await apiRequest('POST', '/api/waitlist', data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'You have been added to our waitlist. We\'ll notify you when we launch.',
      });
      setIsSubmitted(true);
      form.reset();
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to join waitlist. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Form submission handler
  const onSubmit = (data: WaitlistFormValues) => {
    waitlistMutation.mutate(data);
  };
  
  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-lg mb-2">Thank You!</h3>
          <p>You've been added to our waitlist. We'll notify you when we launch.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSubmitted(false)}
        >
          Join Again with Another Email
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-neutral-800">Join Our Waitlist</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you use our app?</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your reason" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="personal">Personal mental wellness</SelectItem>
                    <SelectItem value="therapy">Complement to therapy</SelectItem>
                    <SelectItem value="wellness">Daily wellness practice</SelectItem>
                    <SelectItem value="other">Other reasons</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={waitlistMutation.isPending}
          >
            {waitlistMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Join Waitlist
          </Button>
          
          <p className="text-xs text-neutral-500 text-center">
            By joining, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </Form>
    </div>
  );
}
